import Modal from './Modal.tsx';
import { Button } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import type { DeleteConfirmationProps } from './../../types.tsx';

export default function DeleteConfirmation({ show, onClose, onConfirm, title }: DeleteConfirmationProps) {
    const { t } = useTranslation();

    return (
        <Modal
            show={show}
            title={t('habits.delete', 'Delete Habit')}
            onClose={onClose}
        >
            <p id="modal-description" className="text-gray-700 mb-6">
                {t('modals.areYouSure')} <span className="font-semibold">"{title}"</span>?
            </p>
            <div className="flex justify-end space-x-2">
                <Button color="gray" onClick={onClose}>
                    {t('modals.cancel')}
                </Button>
                <Button
                    color="failure"
                    onClick={onConfirm}
                    className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold px-6 py-2 rounded-md shadow-md transition transform hover:scale-[1.05]"
                >
                    {t('modals.delete')}
                </Button>
            </div>
        </Modal>
    );
}