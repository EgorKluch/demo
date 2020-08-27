import React, {FC} from 'react';
import {createCn} from 'bem-react-classname';
import './StoryBookTitle.scss';

const cn = createCn('StoryBookTitle');

const StoryBookTitle: FC = (props) => {
    return (
        <div className={cn()}>{props.children}</div>
    );
};

export default StoryBookTitle;
