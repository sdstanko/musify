import MainLayout from '@/layouts/MainLayout';
import React, { FC, useRef, useState } from 'react';
import { useFormik } from 'formik';
import styles from './UploadPage.module.css';
import IconBtn from '@/components/UI/IconBtn/IconBtn';
import { useCreateAlbumMutation } from '@/services/AlbumService';
import { useRouter } from 'next/router';
import AddAlbumField from '@/components/AddAlbumField/AddAlbumField';
import { fieldType } from '@/types/fieldType';
import UploadTrackGroup from '@/components/UploadTrackGroup/UploadTrackGroup';
import UploadTrackSchema from '../../formSchemas/UploadSchema';
import Spinner from '@/components/UI/Spinner/Spinner';

export interface ITrackType {
    trackName: string;
    artist: string;
    audio: File | null;
}

export interface CreateAlbumValues {
    albumName: string;
    albumAuthor: string;
    albumCover: File | null;
    tracks: ITrackType[];
}

const UploadPage: FC = () => {
    const initialValues: CreateAlbumValues = {
        albumName: '',
        albumAuthor: '',
        albumCover: null,
        tracks: [{ trackName: '', artist: '', audio: null }],
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: UploadTrackSchema,
        validateOnMount: true,
        onSubmit: (values) => {},
    });

    const topEl = useRef<HTMLDivElement>(null)
    const router = useRouter();
    const [tracksCount, setTracksCount] = useState([0]);
    const [uploadAlbum, { isLoading }] = useCreateAlbumMutation();

    const submitForm = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        topEl.current?.scrollIntoView({ behavior: 'smooth' });

        if (isLoading) return;
        const valid = await formik.validateForm();

        const values = formik.values;
        if (Object.entries(valid).length) {
            alert('Please fill all fields');
            return;
        }

        const formData = new FormData();

        values.tracks.forEach((el: ITrackType, i) => {
            formData.append(`name`, el.trackName);
            formData.append(`artist`, el.artist);
            if (el.audio) {
                formData.append(`audio`, el.audio);
            }
        });

        if (values.albumCover) {
            formData.append('picture', values.albumCover);
        }
        formData.append('albumName', values.albumName);
        formData.append('albumArtist', values.albumAuthor);

        const response = await uploadAlbum(formData).unwrap();
        router.push(`https://danijel.pro/album/${response._id}`);
    };

    const addTrackField = (e: any) => {
        e.preventDefault();
        formik.setFieldValue('tracks', [
            ...formik.values.tracks,
            { trackName: '', artist: '', audio: null },
        ]);
        setTracksCount([...tracksCount, tracksCount.length + 1]);
    };

    return (
        <MainLayout>
            <div className={styles.wrapper}>
                <div className={styles.upload}>
                    <form onSubmit={(e) => submitForm(e)} className={styles.upload__form}>
                        <div className={styles.album}>
                            <div className={styles.album__text} ref={topEl}>
                                <AddAlbumField
                                    formik={formik}
                                    label="Album Name"
                                    fieldName="albumName"
                                    type={fieldType.text}
                                />
                                <AddAlbumField
                                    formik={formik}
                                    label="Album Author"
                                    fieldName="albumAuthor"
                                    type={fieldType.text}
                                />
                            </div>
                            <AddAlbumField
                                formik={formik}
                                fieldName="albumCover"
                                type={fieldType.cover}
                            />
                        </div>
                        <div className={styles.upload__group}>
                            {tracksCount.map((item, index) => (
                                <UploadTrackGroup formik={formik} index={index} key={index} />
                            ))}
                        </div>
                        <IconBtn
                            icon="create"
                            width={36}
                            height={36}
                            onClick={(e) => addTrackField(e)}
                            modifier={styles.upload__addGroup}
                        />
                        <button type="submit" className={styles.upload__submit}>
                            upload album
                        </button>
                        {isLoading && <Spinner />}
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default UploadPage;
