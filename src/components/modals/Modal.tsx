import type { ReactNode } from 'react';
import { motion, AnimatePresence } from "framer-motion";

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
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
