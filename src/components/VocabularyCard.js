...
<button onClick={() => setShowConfirmDialog(true)}>Delete</button>
<Modal show={showConfirmDialog} onHide={() => setShowConfirmDialog(false)}>
  <h2>Confirm Delete</h2>
  <p>Are you sure you want to delete this vocabulary card?</p>
  <div className="modal-actions">
    <button onClick={() => setShowConfirmDialog(false)}>Cancel</button>
    <button onClick={handleDeleteCard}>Delete</button>
  </div>
</Modal>
...
