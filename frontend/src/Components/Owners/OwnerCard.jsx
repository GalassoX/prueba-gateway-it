import { useEffect, useState } from 'react';
import useFetchOwnerById from '../../hooks/useFetchOwnerById';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';

const OwnerCard = ({ ownerId, setOwnerId }) => {

    const { owner } = useFetchOwnerById(ownerId);

    const [open, setOpen] = useState(false);
    const [ownerData, setOwnerData] = useState({});
    const [ownerDataFetching, setOwnerDataFetching] = useState(true);

    useEffect(() => {
        if (!ownerId) return;
        setOpen(true)
        setOwnerDataFetching(true);
    }, [ownerId])

    useEffect(() => {
        setOwnerData(owner);
        setOwnerDataFetching(false);
    }, [owner]);

    return (
        <Modal isOpen={open}>
            <Modal.Header onClose={() => {
                setOpen(false);
                setOwnerId(0);
            }}>
                <h2>
                    {!ownerDataFetching
                        ? `Propietario ${ownerData.name} [#${ownerId}]`
                        : ''
                    }
                </h2>
            </Modal.Header>
            <Modal.Body>
                {!ownerDataFetching
                    ? <>
                        <h3>Nombre</h3><p>{ownerData.name}</p>
                        <h3>Documento</h3><p>{ownerData.document} {ownerData.type_doc}</p>
                        <h3>Dirección</h3><p>{ownerData.address}</p>
                        <h3>Teléfono</h3><p>{ownerData.phone}</p>
                        <h3>Correo Electronico</h3><p>{ownerData.mail}</p>
                    </>
                    : <Loading />
                }
            </Modal.Body>
        </Modal>
    )
}

export default OwnerCard;