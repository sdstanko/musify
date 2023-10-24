import * as Yup from 'yup'

const UploadTrackSchema = Yup.object().shape({
    albumName: Yup.string()
        .min(2, 'must be atleast 2 symbols')
        .max(50, 'Too Long!')
        .required('Required'),
    albumAuthor: Yup.string()
        .min(2, 'must be atleast 2 symbols')
        .max(50, 'Too Long!')
        .required('Required'),
    albumCover: Yup.mixed().required('Required'),
    tracks: Yup.array().of(
        Yup.object().shape({
            audio: Yup.mixed().required('Required'),
            trackName: Yup.string()
                .min(2, 'must be atleast 2 symbols')
                .max(50, 'Too Long!')
                .required('Required'),
            artist: Yup.string()
                .min(2, 'must be atleast 2 symbols')
                .max(50, 'Too Long!')
                .required('Required'),
        }),
    ),
});

export default UploadTrackSchema;