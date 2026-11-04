import React from 'react';

function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi Hapus Data',
  itemName = '',
  message = 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.',
  isDeleting = false,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)' }}
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '440px' }}>
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden animate-fadeIn">
          {/* Header & Warning Icon */}
          <div className="modal-body p-4 text-center">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-10 text-danger mb-3"
              style={{ width: '70px', height: '70px' }}
            >
              <i className="fa-solid fa-triangle-exclamation fs-2"></i>
            </div>
            
            <h5 className="modal-title fw-bold text-dark mb-2">{title}</h5>
            
            <p className="text-secondary small mb-3">
              {message}
            </p>

            {itemName && (
              <div className="bg-light p-3 rounded-3 border text-dark fw-bold mb-2 text-break">
                <i className="fa-solid fa-quote-left text-danger me-2 small"></i>
                {itemName}
                <i className="fa-solid fa-quote-right text-danger ms-2 small"></i>
              </div>
            )}
          </div>

          {/* Modal Footer Action Buttons */}
          <div className="modal-footer bg-light border-top p-3 px-4 d-flex justify-content-center gap-3">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill px-4"
              onClick={onClose}
              disabled={isDeleting}
            >
              Batal
            </button>
            <button
              type="button"
              className="btn btn-danger rounded-pill px-4 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Menghapus...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-trash-can"></i>
                  <span>Ya, Hapus Data</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
