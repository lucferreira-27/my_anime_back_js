import { useRef } from 'react';

const useForm = () => {
  const formRef = useRef();

  function getInputValues() {
    const formData = new FormData(formRef.current);
    const values = {};
    for (let key of formData.keys()) {
      values[key] = formData.get(key);
    }
    return values;
  }

  return [formRef, getInputValues];
}

export default useForm