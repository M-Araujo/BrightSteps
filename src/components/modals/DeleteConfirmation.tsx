import Modal from './Modal.tsx';
import { useTranslation } from 'react-i18next';
import ModelActionButton from './../ui/ModelActionButton.tsx';
import type { DeleteConfirmationProps } from './../../types.tsx';

export default function DeleteConfirmation({ show, onClose, onConfirm, title }: DeleteConfirmationProps) {
    const { t } = useTranslation();

    return (
        <Modal
            show={show}
            title={t('modals.deleteItem')}
            onClose={onClose}
        >
            <p id="modal-description" className="text-gray-700 mb-6">
                {t('modals.areYouSure')} <span className="font-semibold">"{title}"</span>?
            </p>
            <div className="flex justify-end space-x-2">
                <ModelActionButton onClick={onClose} text={t('modals.cancel')} variant={'cancel'} />
                <ModelActionButton onClick={onConfirm} text={t('modals.delete')} variant={'failure'} />
            </div>
        </Modal>
    );
}