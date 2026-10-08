import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

type ModalType = 'success' | 'warning' | 'danger' | 'info';

interface ModalOptions {
  title: string;
  message: string;
  type?: ModalType;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

interface ModalContextType {
  showAlert: (title: string, message: string, type?: ModalType) => void;
  showConfirm: (title: string, message: string, onConfirm: () => void, type?: ModalType) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalOptions | null>(null);

  const showAlert = (title: string, message: string, type: ModalType = 'warning') => {
    setModalState({
      title,
      message,
      type,
      showCancel: false,
      onConfirm: () => setModalState(null)
    });
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void, type: ModalType = 'warning') => {
    setModalState({
      title,
      message,
      type,
      showCancel: true,
      onConfirm: () => {
        onConfirm();
        setModalState(null);
      },
      onCancel: () => setModalState(null)
    });
  };

  return (
    <ModalContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      {modalState && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={`bg-[#111111] border ${modalState.type === 'danger' ? 'border-danger/50' : modalState.type === 'success' ? 'border-success/50' : 'border-warning/50'} p-8 rounded-2xl max-w-md w-full shadow-2xl transform transition-all`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${modalState.type === 'danger' ? 'bg-danger/20' : modalState.type === 'success' ? 'bg-success/20' : modalState.type === 'info' ? 'bg-primary/20' : 'bg-warning/20'}`}>
              {modalState.type === 'danger' && <AlertCircle className="text-danger" size={32} />}
              {modalState.type === 'success' && <CheckCircle className="text-success" size={32} />}
              {modalState.type === 'warning' && <AlertCircle className="text-warning" size={32} />}
              {modalState.type === 'info' && <Info className="text-primary" size={32} />}
            </div>
            <h2 className="text-2xl font-bold mb-3 text-white text-center">{modalState.title}</h2>
            <p className="text-text-secondary mb-8 text-center text-sm leading-relaxed whitespace-pre-wrap">
              {modalState.message}
            </p>
            <div className="flex gap-4">
              {modalState.showCancel && (
                <button 
                  onClick={modalState.onCancel}
                  className="flex-1 px-4 py-3 rounded-xl bg-panel-bg text-white hover:bg-slate-800 transition-colors font-medium border border-panel-border"
                >
                  Cancel
                </button>
              )}
              <button 
                onClick={modalState.onConfirm}
                className={`flex-1 px-4 py-3 rounded-xl text-white transition-colors font-bold shadow-lg ${modalState.type === 'danger' ? 'bg-danger hover:bg-red-600 shadow-danger/20' : modalState.type === 'success' ? 'bg-success hover:bg-green-600 shadow-success/20' : modalState.type === 'info' ? 'bg-primary hover:bg-primary-hover shadow-primary/20' : 'bg-warning hover:bg-yellow-600 shadow-warning/20 text-black'}`}
              >
                {modalState.showCancel ? 'Confirm' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
