import { Button } from "flowbite-react";

export default function ButtonCancel() {
    return (
     <Button color="gray" onClick={onClose}> {t('modals.cancel')}</Button>
    );
}