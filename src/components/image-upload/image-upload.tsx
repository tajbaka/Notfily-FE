// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { IProps, Text } from "@blueprintjs/core";

import "./styles.css";

interface IImageUploadProps extends IProps {
    src?: string;
    title?: string;
    onUploadImage?:(event: any) => void;
}

export const ImageUpload: React.SFC<IImageUploadProps> = props => {
    const { className, onUploadImage, title, src } = props;
    const classes = classNames('image-upload', className);
    return (
        <div className={classes}>
            {src ?
                <div className={classes + '-icon-image'}> 
                    <img  src={src} />
                </div>
            :
                <div className={classes + '-icon-filler'}/>
            }
            {onUploadImage &&
                <input className={classes + '-icon-filler-image'} type='file' onChange={onUploadImage} />
            }
            {title &&
                <Text className={classes + '-icon-filler-text'}> { title } </Text>
            }
        </div>
    );
}

export default ImageUpload;
