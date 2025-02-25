# 親スクロール再設定

モーダルを開いた際に親側のスクロールを移動させないようにしつつ、overflow: hiddenをセットしても親画面のスクロール位置が一番上に戻らないようにするには、現在のスクロール位置を保存し、モーダルが閉じられたときにその位置に戻す必要があります。

以下はその実装例です。

モーダルコンポーネント
まず、モーダルコンポーネントを作成します。

```
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <p>モーダルの内容</p>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
```

スクロール位置を保存するためのイベントリスナー
次に、スクロール位置を保存するためのイベントリスナーを追加します。

```
import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;
```

CSSスタイル
必要に応じて、モーダルのスタイルを定義します。

```
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
```

この実装により、モーダルが開かれた際に親画面のスクロール位置が保存され、overflow: hiddenをセットしてもスクロール位置が一番上に戻らないようになります。モーダルが閉じられた際には、保存したスクロール位置に戻ります。