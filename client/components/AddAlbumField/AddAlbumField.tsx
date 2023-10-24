import { CreateAlbumValues } from '@/pages/upload';
import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './AddAlbumField.module.css';
import { ITrackType } from '../../pages/upload/index';
import { fieldType } from '@/types/fieldType';
import { IFormik } from '../../types/formik';

interface Values extends FormikValues, CreateAlbumValues {}

export interface AddAlbumFieldProps {
    formik: IFormik<Values>;
    label?: string;
    fieldName: string;
    type: fieldType;
    index?: number;
}

const AddAlbumField: FC<AddAlbumFieldProps> = ({ formik, label, fieldName, type, index }) => {
    const isTrackField = index !== undefined;
    const [src, setSrc] = useState('');
    const [error, setError] = useState<FormikErrors<Values> | undefined>({});
    const fileInput = useRef<HTMLInputElement>(null);
    const touched = isTrackField ? formik.touched[fieldName + index] : formik.touched[fieldName];

    useEffect(() => {
        const formikErr = formik.errors;
        if (isTrackField) {
            const trackErrors = formikErr?.tracks?.[index];
            if (typeof trackErrors === 'object' || typeof trackErrors === 'undefined') {
                setError(trackErrors);
            }
        } else {
            if (typeof formikErr === 'object') {
                setError(formikErr);
            }
        }
    }, [formik.errors, formik.touched]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === fieldType.text) {
            if (isTrackField) {
                formik.setFieldValue(`tracks[${index}].${fieldName}`, e.currentTarget.value);
            } else {
                formik.handleChange(e);
            }
        } else {
            formik.setFieldValue(
                type === fieldType.cover ? 'albumCover' : `tracks[${index}].audio`,
                e.currentTarget.files![0],
            );
        }
    };

    const returnValue = () => {
        if (type !== fieldType.text) {
            return undefined;
        }
        if (isTrackField) {
            const track = formik.values.tracks[index];
            return track[fieldName as keyof ITrackType];
        } else {
            return formik.values[fieldName];
        }
    };

    useEffect(() => {
        if (type === fieldType.cover && formik.values.albumCover) {
            setSrc(URL.createObjectURL(formik.values.albumCover));
        }
    }, [formik.values.albumCover]);

    const handleUpload = (ref: React.MutableRefObject<HTMLInputElement | null>) => {
        ref.current?.select();
    };

    return (
        <div className={[styles.field, styles[fieldType[type]]].join(' ')}>
            {type === fieldType.cover && (
                <img
                    className={styles.field__coverPreview}
                    src={src ? src : 'https://placehold.co/200x200?text=cover'}
                ></img>
            )}
            <label
                htmlFor={isTrackField ? fieldName + index : fieldName}
                className={styles.field__label}
            >
                {type !== 'text' && (
                    <>
                        <div
                            className={
                                error?.[fieldName] && touched
                                    ? [styles.field__button, styles.field__button_error].join(' ')
                                    : styles.field__button
                            }
                            onClick={() => handleUpload(fileInput)}
                        >{`Upload ${type}`}</div>
                        <div>{index != undefined && formik.values.tracks[index].audio?.name}</div>
                    </>
                )}
                {label}
                <input
                    id={isTrackField ? fieldName + index : fieldName}
                    name={isTrackField ? fieldName + index : fieldName}
                    onBlur={formik.handleBlur}
                    value={returnValue()}
                    className={
                        type === fieldType.text ? styles.field__textInput : styles.visually_hidden
                    }
                    type={type === fieldType.text ? 'text' : 'file'}
                    accept={
                        type === fieldType.cover
                            ? 'image/*'
                            : type === fieldType.audio
                            ? 'audio/*'
                            : ''
                    }
                    onChange={(e) => changeHandler(e)}
                    ref={type !== fieldType.text ? fileInput : null}
                />
            </label>
            {error?.[fieldName] && touched && type === fieldType.text ? (
                <div className={styles.field__error}>{String(error?.[fieldName])}</div>
            ) : null}
        </div>
    );
};

export default AddAlbumField;
