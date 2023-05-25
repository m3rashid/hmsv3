import 'react-quill/dist/quill.snow.css';
import './quill.css';

/**
 * @type {import("react-quill").ReactQuillProps}
 */
const quillDefaults = {
  theme: 'snow',
  preserveWhitespace: true,
  style: {
    borderRadius: 8,
    height: 150,
  },
  modules: {
    toolbar: [['bold', 'underline', { list: 'ordered' }, { list: 'bullet' }, 'link', 'image']],
  },
};

export default quillDefaults;
