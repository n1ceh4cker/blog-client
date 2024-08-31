import * as Yup from 'yup';
export const initialProfile = {
  username: '',
  bio: '',
  imageUrl: ''
};

export const initialPost = {
  title: '',
  content: '',
  imageUrl: ''
};

export const initialAuth = {
  email: '',
  password: ''
};
export const postValidator = Yup.object({
  title: Yup.string().required('Title is required!').max(25, 'Length must be atmost 25!').min(5, 'Length must be atleast 5!'),
  content: Yup.string().required('Content is required!'),
  imageUrl: Yup.string().required('Image is required!')
});

export const profileValidator = Yup.object({
  username: Yup.string().required('Usernmae is required!').max(15, 'Length must be atmost 15!').min(5, 'Length must be atleast 5!'),
  bio: Yup.string().required('Bio is required!'),
  imageUrl: Yup.string().required('Image is required!')
});
export const authValidator = Yup.object({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required')
});
