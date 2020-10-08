import Avatar from "avataaars";
import React from "react";

const UserAvatar = (props) => {
    if (props.avatar){
        return (
            <Avatar
                style={{width: props.width, height: props.width}}
                avatarStyle='Circle'
                topType={props.avatar.topType}
                accessoriesType={props.avatar.accessoriesType}
                hairColor={props.avatar.hairColor}
                facialHairType={props.avatar.facialHairType}
                facialHairColor={props.avatar.facialHairColor}
                clotheType={props.avatar.clotheType}
                clotheColor={props.avatar.clotheColor}
                eyeType={props.avatar.eyeType}
                eyebrowType={props.avatar.eyebrowType}
                mouthType={props.avatar.mouthType}
                skinColor={props.avatar.skinColor}
            />
        )
    }
    return false
}

export default UserAvatar