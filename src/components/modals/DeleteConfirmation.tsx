
import Modal from './Modal.tsx';
import { Button } from "flowbite-react";
import { useTranslation } from 'react-i18next';

export default function DeleteContirmation({ show, onConfirm, onClose }) {

    const { t } = useTranslation();

    return (

        <Modal
            show={show}
            title="Delete item"
            onClose={onClose}
        >

            <p id="modal-description" className="text-gray-700 mb-6">
                {t('modals.areYouSure')}  ?? t('modals.thisItem')?
            </p>

            <div className="flex justify-end space-x-2 mt-4">
                <Button color="gray" onClick={onClose}> {t('modals.cancel')}</Button>
                <Button
                    type="submit"
                    color="failure"
                    className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold px-6 py-2 rounded-md shadow-md transition transform hover:scale-[1.05]"
                    onClick={onConfirm}
                >
                    {t('modals.submit')}
                </Button>
            </div>
        </Modal>
    );
}