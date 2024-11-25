function Modal() {
  return (
    <div>
      {/* This is only working correctly because we happen to not have a position parent! */}
      <div className="absolute inset-0 bg-gray-300 opacity-80"></div>
      <div className="absolute inset-40 p-10 bg-white">I'm a modal!</div>
    </div>
  );
}

export default Modal;
