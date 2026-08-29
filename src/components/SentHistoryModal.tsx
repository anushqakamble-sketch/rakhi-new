import React from 'react';
import { Copy, Share2, ExternalLink, Trash2, Heart } from 'lucide-react';
import { RakhiData } from '../types';
import { getSavedRakhis, getShareableUrl } from '../utils/storage';
import { RakhiRenderer } from './Rakhis';

interface SentHistoryModalProps {
  onClose: () => void;
  onSelectRakhi: (rakhi: RakhiData) => void;
  onRefresh: () => void;
}

export const SentHistoryModal: React.FC<SentHistoryModalProps> = ({ onClose, onSelectRakhi, onRefresh }) => {
  const [rakhis, setRakhis] = React.useState<RakhiData[]>(getSavedRakhis());
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (rakhi: RakhiData) => {
    const url = getShareableUrl(rakhi);
    navigator.clipboard.writeText(url);
    setCopiedId(rakhi.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    const updated = rakhis.filter((r) => r.id !== id);
    localStorage.setItem('send_a_rakhi_creations_v1', JSON.stringify(updated));
    setRakhis(updated);
    onRefresh();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="font-serif text-xl font-bold text-gray-900">My Sent Rakhis</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {rakhis.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm">No Rakhis created yet.</p>
            </div>
          ) : (
            rakhis.map((r) => (
              <div
                key={r.id}
                className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-rose-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="scale-75 origin-left -my-3 shrink-0">
                    <RakhiRenderer designId={r.designId} size={80} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-gray-900">
                      To: {r.brotherNickname || r.brotherName}
                    </h4>
                    <p className="text-xs text-rose-600 font-medium">From: {r.sisterName}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {new Date(r.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => onSelectRakhi(r)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 text-xs font-semibold border border-gray-200 shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <ExternalLink className="w-3 h-3" /> View
                  </button>

                  <button
                    onClick={() => handleCopy(r)}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" /> {copiedId === r.id ? 'Copied' : 'Link'}
                  </button>

                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
