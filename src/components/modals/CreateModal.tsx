import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "flowbite-react";

interface ModalProps {
    show: boolean;
    title?: string;
    onClose: () => void;
    onConfirm?: () => void;
    children: ReactNode;
    confirmText?: string;
    cancelText?: string;
}

export default function Modal({
    show,
    title,
    onClose,
    onConfirm,
    children
}: ModalProps) {
    const { t } = useTranslation();

    if (!show) return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4"
                        initial={{ scale: 0.95, y: 40, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 40, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {title && <h2 className="text-lg font-semibold">{title}</h2>}
                        <div>{children}</div>
                        <div className="flex justify-end space-x-2 mt-4">
                            <Button color="gray" onClick={onClose}> {t('modals.cancel')}</Button>
                            <Button
                                onClick={onConfirm}
                                type="submit"
                                color="success"
                                className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold px-6 py-2 rounded-md shadow-md transition transform hover:scale-[1.05]"
                            >
                                {t('modals.submit')}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
