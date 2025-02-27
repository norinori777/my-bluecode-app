# オートコンプリート対応

Reactで複数のInput項目をオートコンプリートするときにchangeイベントが発生しない問題は、ブラウザのオートコンプリート機能が原因であることが多いです。この問題を解決するためには、onChangeイベントハンドラに加えて、onInputイベントハンドラを使用することが有効です。

以下は、onInputイベントハンドラを追加する例です。

```
import React, { useState } from 'react';

const AutoCompleteForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <form>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onInput={handleInput}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onInput={handleInput}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onInput={handleInput}
        />
      </div>
    </form>
  );
};

export default AutoCompleteForm;
```

このように、onChangeイベントハンドラとonInputイベントハンドラの両方を使用することで、ブラウザのオートコンプリート機能が動作した際にもステートが更新されるようになります。