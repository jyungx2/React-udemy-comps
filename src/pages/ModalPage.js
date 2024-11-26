import Modal from "../components/Modal";
import Button from "../components/Button";
import { useState } from "react";

function ModalPage() {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(true);
  };

  // ⛔️ 243. Closing the Modal
  const handleClose = () => {
    // 호출될 때마다 모달이 닫히도록
    setShowModal(false);
  };

  // 🌼 244. Customizing the Modal
  const actionBar = (
    <div>
      <Button onClick={handleClose} primary>
        I Accept
      </Button>
    </div>
  );

  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      <p>Here is an important agreement for you to accept</p>
    </Modal>
  );

  return (
    <div className="relative">
      <Button onClick={handleClick} primary>
        Open Modal
      </Button>
      {showModal && modal}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis
        mauris eros, quis volutpat nulla interdum et. Aliquam quis lacinia
        risus. Quisque in neque dictum, gravida erat pellentesque, finibus
        nulla. Quisque fringilla, erat ut vestibulum ornare, risus justo
        eleifend ipsum, iaculis ornare justo sapien eget nunc. Curabitur id odio
        maximus, posuere nisi at, condimentum sem. Sed faucibus placerat ligula,
        nec scelerisque nibh volutpat aliquam. Etiam pellentesque posuere odio,
        quis tincidunt purus interdum eu. Donec venenatis odio sed fringilla
        facilisis. Aenean vel condimentum mauris, eleifend condimentum leo.
        Suspendisse at nulla odio. Nunc pellentesque ipsum at est dictum, non
        vehicula orci molestie. Aliquam aliquet est non metus vulputate, a
        tincidunt erat pellentesque.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis
        mauris eros, quis volutpat nulla interdum et. Aliquam quis lacinia
        risus. Quisque in neque dictum, gravida erat pellentesque, finibus
        nulla. Quisque fringilla, erat ut vestibulum ornare, risus justo
        eleifend ipsum, iaculis ornare justo sapien eget nunc. Curabitur id odio
        maximus, posuere nisi at, condimentum sem. Sed faucibus placerat ligula,
        nec scelerisque nibh volutpat aliquam. Etiam pellentesque posuere odio,
        quis tincidunt purus interdum eu. Donec venenatis odio sed fringilla
        facilisis. Aenean vel condimentum mauris, eleifend condimentum leo.
        Suspendisse at nulla odio. Nunc pellentesque ipsum at est dictum, non
        vehicula orci molestie. Aliquam aliquet est non metus vulputate, a
        tincidunt erat pellentesque.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis
        mauris eros, quis volutpat nulla interdum et. Aliquam quis lacinia
        risus. Quisque in neque dictum, gravida erat pellentesque, finibus
        nulla. Quisque fringilla, erat ut vestibulum ornare, risus justo
        eleifend ipsum, iaculis ornare justo sapien eget nunc. Curabitur id odio
        maximus, posuere nisi at, condimentum sem. Sed faucibus placerat ligula,
        nec scelerisque nibh volutpat aliquam. Etiam pellentesque posuere odio,
        quis tincidunt purus interdum eu. Donec venenatis odio sed fringilla
        facilisis. Aenean vel condimentum mauris, eleifend condimentum leo.
        Suspendisse at nulla odio. Nunc pellentesque ipsum at est dictum, non
        vehicula orci molestie. Aliquam aliquet est non metus vulputate, a
        tincidunt erat pellentesque.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis
        mauris eros, quis volutpat nulla interdum et. Aliquam quis lacinia
        risus. Quisque in neque dictum, gravida erat pellentesque, finibus
        nulla. Quisque fringilla, erat ut vestibulum ornare, risus justo
        eleifend ipsum, iaculis ornare justo sapien eget nunc. Curabitur id odio
        maximus, posuere nisi at, condimentum sem. Sed faucibus placerat ligula,
        nec scelerisque nibh volutpat aliquam. Etiam pellentesque posuere odio,
        quis tincidunt purus interdum eu. Donec venenatis odio sed fringilla
        facilisis. Aenean vel condimentum mauris, eleifend condimentum leo.
        Suspendisse at nulla odio. Nunc pellentesque ipsum at est dictum, non
        vehicula orci molestie. Aliquam aliquet est non metus vulputate, a
        tincidunt erat pellentesque.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis
        mauris eros, quis volutpat nulla interdum et. Aliquam quis lacinia
        risus. Quisque in neque dictum, gravida erat pellentesque, finibus
        nulla. Quisque fringilla, erat ut vestibulum ornare, risus justo
        eleifend ipsum, iaculis ornare justo sapien eget nunc. Curabitur id odio
        maximus, posuere nisi at, condimentum sem. Sed faucibus placerat ligula,
        nec scelerisque nibh volutpat aliquam. Etiam pellentesque posuere odio,
        quis tincidunt purus interdum eu. Donec venenatis odio sed fringilla
        facilisis. Aenean vel condimentum mauris, eleifend condimentum leo.
        Suspendisse at nulla odio. Nunc pellentesque ipsum at est dictum, non
        vehicula orci molestie. Aliquam aliquet est non metus vulputate, a
        tincidunt erat pellentesque.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis
        mauris eros, quis volutpat nulla interdum et. Aliquam quis lacinia
        risus. Quisque in neque dictum, gravida erat pellentesque, finibus
        nulla. Quisque fringilla, erat ut vestibulum ornare, risus justo
        eleifend ipsum, iaculis ornare justo sapien eget nunc. Curabitur id odio
        maximus, posuere nisi at, condimentum sem. Sed faucibus placerat ligula,
        nec scelerisque nibh volutpat aliquam. Etiam pellentesque posuere odio,
        quis tincidunt purus interdum eu. Donec venenatis odio sed fringilla
        facilisis. Aenean vel condimentum mauris, eleifend condimentum leo.
        Suspendisse at nulla odio. Nunc pellentesque ipsum at est dictum, non
        vehicula orci molestie. Aliquam aliquet est non metus vulputate, a
        tincidunt erat pellentesque.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis
        mauris eros, quis volutpat nulla interdum et. Aliquam quis lacinia
        risus. Quisque in neque dictum, gravida erat pellentesque, finibus
        nulla. Quisque fringilla, erat ut vestibulum ornare, risus justo
        eleifend ipsum, iaculis ornare justo sapien eget nunc. Curabitur id odio
        maximus, posuere nisi at, condimentum sem. Sed faucibus placerat ligula,
        nec scelerisque nibh volutpat aliquam. Etiam pellentesque posuere odio,
        quis tincidunt purus interdum eu. Donec venenatis odio sed fringilla
        facilisis. Aenean vel condimentum mauris, eleifend condimentum leo.
        Suspendisse at nulla odio. Nunc pellentesque ipsum at est dictum, non
        vehicula orci molestie. Aliquam aliquet est non metus vulputate, a
        tincidunt erat pellentesque.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis
        mauris eros, quis volutpat nulla interdum et. Aliquam quis lacinia
        risus. Quisque in neque dictum, gravida erat pellentesque, finibus
        nulla. Quisque fringilla, erat ut vestibulum ornare, risus justo
        eleifend ipsum, iaculis ornare justo sapien eget nunc. Curabitur id odio
        maximus, posuere nisi at, condimentum sem. Sed faucibus placerat ligula,
        nec scelerisque nibh volutpat aliquam. Etiam pellentesque posuere odio,
        quis tincidunt purus interdum eu. Donec venenatis odio sed fringilla
        facilisis. Aenean vel condimentum mauris, eleifend condimentum leo.
        Suspendisse at nulla odio. Nunc pellentesque ipsum at est dictum, non
        vehicula orci molestie. Aliquam aliquet est non metus vulputate, a
        tincidunt erat pellentesque.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis
        mauris eros, quis volutpat nulla interdum et. Aliquam quis lacinia
        risus. Quisque in neque dictum, gravida erat pellentesque, finibus
        nulla. Quisque fringilla, erat ut vestibulum ornare, risus justo
        eleifend ipsum, iaculis ornare justo sapien eget nunc. Curabitur id odio
        maximus, posuere nisi at, condimentum sem. Sed faucibus placerat ligula,
        nec scelerisque nibh volutpat aliquam. Etiam pellentesque posuere odio,
        quis tincidunt purus interdum eu. Donec venenatis odio sed fringilla
        facilisis. Aenean vel condimentum mauris, eleifend condimentum leo.
        Suspendisse at nulla odio. Nunc pellentesque ipsum at est dictum, non
        vehicula orci molestie. Aliquam aliquet est non metus vulputate, a
        tincidunt erat pellentesque.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis
        mauris eros, quis volutpat nulla interdum et. Aliquam quis lacinia
        risus. Quisque in neque dictum, gravida erat pellentesque, finibus
        nulla. Quisque fringilla, erat ut vestibulum ornare, risus justo
        eleifend ipsum, iaculis ornare justo sapien eget nunc. Curabitur id odio
        maximus, posuere nisi at, condimentum sem. Sed faucibus placerat ligula,
        nec scelerisque nibh volutpat aliquam. Etiam pellentesque posuere odio,
        quis tincidunt purus interdum eu. Donec venenatis odio sed fringilla
        facilisis. Aenean vel condimentum mauris, eleifend condimentum leo.
        Suspendisse at nulla odio. Nunc pellentesque ipsum at est dictum, non
        vehicula orci molestie. Aliquam aliquet est non metus vulputate, a
        tincidunt erat pellentesque.
      </p>
      {/* <Button onClick={handleClick} primary>
        Open Modal
      </Button>
      {showModal && modal} */}
    </div>
  );
}
export default ModalPage;
