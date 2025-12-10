import { useState, useCallback } from "react";

/**
 * Custom hook for managing multiple modals in a component
 * @returns {Object} Modal manager object with state and handlers
 */
const useModalManager = () => {
	const [activeModal, setActiveModal] = useState(null);
	const [modalData, setModalData] = useState(null);

	const openModal = useCallback((modalName, data = null) => {
		setActiveModal(modalName);
		setModalData(data);
	}, []);

	const closeModal = useCallback(() => {
		setActiveModal(null);
		setModalData(null);
	}, []);

	const isOpen = useCallback(
		(modalName) => activeModal === modalName,
		[activeModal]
	);

	return {
		activeModal,
		modalData,
		openModal,
		closeModal,
		isOpen,
	};
};

export default useModalManager;
