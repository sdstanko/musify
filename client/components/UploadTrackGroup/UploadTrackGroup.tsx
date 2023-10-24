import { CreateAlbumValues } from '@/pages/upload';
import { fieldType } from '@/types/fieldType';
import { IFormik } from '@/types/formik';
import { FormikValues } from 'formik';
import React, { FC } from 'react';
import AddAlbumField, { AddAlbumFieldProps } from '../AddAlbumField/AddAlbumField';
import styles from './UploadTrackGroup.module.css';

interface Values extends FormikValues, CreateAlbumValues {}

interface UploadTrackGroupProps {
    formik: IFormik<Values>;
    index: number;
}

const UploadTrackGroup: FC<UploadTrackGroupProps> = ({ formik, index }) => {
    return (
        <div>
            <AddAlbumField
                formik={formik}
				label='Track Name'
                fieldName="trackName"
                type={fieldType.text}
                index={index}
            />
            <AddAlbumField formik={formik} label='Artist' fieldName="artist" type={fieldType.text} index={index} />
            <AddAlbumField formik={formik} fieldName="audio" type={fieldType.audio} index={index} />
        </div>
    );
};

export default UploadTrackGroup;
