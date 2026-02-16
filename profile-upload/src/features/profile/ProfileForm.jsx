import { useDispatch, useSelector } from "react-redux";
import { submitProfile, clearSuccess } from "./profileSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useEffect, useRef } from "react";


const schema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  mobile: Yup.string().min(10).required(),
});

export default function ProfileForm() {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const { loading, success } = useSelector((s) => s.profile);

useEffect(() => {
  if (success) {
    const timer = setTimeout(() => {
      dispatch(clearSuccess());
    }, 4000);

    return () => clearTimeout(timer);
  }
}, [success, dispatch]);

  return (
    <Formik
      initialValues={{ name: "", email: "", mobile: "", image: "" }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
     console.log("Form Submitted!", values);
        const fd = new FormData();
        Object.keys(values).forEach((k) => fd.append(k, values[k]));
        dispatch(submitProfile(fd)).then((res) => {
    if (!res.error) {
      resetForm();     
      fileRef.current.value = "";
    }
  });
      }
    }
    >
      
       {({ setFieldValue, errors, touched, resetForm }) => (
  <Form>

    <div>
      <Field name="name" placeholder="Name" />
      {touched.name && errors.name && (
        <div style={{ color: "red" }}>{errors.name}</div>
      )}
    </div>

    <div>
      <Field name="email" placeholder="Email" />
      {touched.email && errors.email && (
        <div style={{ color: "red" }}>{errors.email}</div>
      )}
    </div>

    <div>
      <Field name="mobile" placeholder="Mobile" />
      {touched.mobile && errors.mobile && (
        <div style={{ color: "red" }}>{errors.mobile}</div>
      )}
    </div>

    <input
      type="file"
      name="image"
      ref={fileRef}
      onChange={(e) => setFieldValue("image", e.target.files[0])}
    />

    <button type="submit">
      {loading ? "Uploading..." : "Submit"}
    </button>

    {success && <p>Profile Created ✅</p>}

  </Form>
)}   
    </Formik>
  );
}
