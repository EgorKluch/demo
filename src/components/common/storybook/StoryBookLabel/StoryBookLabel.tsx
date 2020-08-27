import React, {FC} from 'react';
import {createCn} from 'bem-react-classname';
import './StoryBookLabel.scss';

const cn = createCn('StoryBookLabel');

const StoryBookLabel: FC = (props) => {
    return (
        <div className={cn()}>{props.children}</div>
    );
};

export default StoryBookLabel;
