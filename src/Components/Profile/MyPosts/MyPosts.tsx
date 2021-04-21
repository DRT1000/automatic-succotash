import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {MyPostsType} from "./MyPostsContainer";
import {useFormik} from "formik";

type FormikErrorType = {
    newPostText?: string
}

function MyPosts(props: MyPostsType) {
    let postElements = props.profilePage.posts.map(
        (p) => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)


    const formik = useFormik({
        initialValues: {
            newPostText: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.newPostText.trim()) {
                errors.newPostText = 'Required';
            } else if (values.newPostText.trim().length > 10) {
                errors.newPostText = 'Max length = 10 symbols';
            }
            return errors
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            props.addPost(formik.values.newPostText)
            formik.resetForm()
        },
    })

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
                <form onSubmit={formik.handleSubmit}>
                        <textarea
                            id="newPostText"
                            name="newPostText"
                            value={formik.values.newPostText}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    {formik.touched.newPostText && formik.errors.newPostText
                        ? <div style={{color: "red"}}>{formik.errors.newPostText}</div>
                        : null}
                    <div>
                        <button>Add post</button>
                    </div>
                </form>
            </div>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
}

export default MyPosts