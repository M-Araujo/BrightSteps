import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Button } from "flowbite-react";

type DeleteModalProps = {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
};

export default function DeleteModal({ show, onClose, onConfirm, itemName }: DeleteModalProps) {
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
                        initial={{ scale: 0.95, y: 40, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 40, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <h2 id="modal-title" className="text-lg font-semibold mb-4">{t('modals.confirmDelete')}</h2>
                        <p id="modal-description" className="text-gray-700 mb-6">
                            {t('modals.areYouSure')} {itemName ?? t('modals.thisItem')}?
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button color="gray" onClick={onClose}> {t('modals.cancel')}</Button>
                            <Button
                                color="failure"
                                onClick={onConfirm}
                                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold px-6 py-2 rounded-md shadow-md transition transform hover:scale-[1.05]"
                            >
                                {t('modals.delete')}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
