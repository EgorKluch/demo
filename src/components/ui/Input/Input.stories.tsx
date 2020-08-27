import React from 'react';
import {createCn} from "bem-react-classname";
import StoryBookContainer from "#/components/common/storybook/StoryBookContainer";
import StoryBookTitle from "../../common/storybook/StoryBookTitle";
import {InputView} from "./Input";
import {action} from "@storybook/addon-actions";
import {Locale} from "#/types/common";
import './Input.stories.scss';

const cn = createCn('InputStory');

export const InputStory = () => {

  return (
    <StoryBookContainer locale={Locale.ru} className={cn()}>
      <StoryBookTitle>Inputs</StoryBookTitle>
      <InputView
        className={cn('input')}
        label='Input'
        name='simple'
        value='value'
        type='text'
        onChange={() => action('Input changed')}
      />
      <InputView
        className={cn('input')}
        label='With empty value'
        dirty={false}
        touched={false}
        name='simple'
        value=''
        type='text'
        onChange={action('Input changed')}
      />
      <InputView
        className={cn('input')}
        label='Hover input'
        name='simple'
        value='value'
        type='text'
        isHover={true}
        onChange={() => action('Input changed')}
      />
      <InputView
        className={cn('input')}
        isActive={true}
        label='Active input'
        dirty={true}
        touched={true}
        name='simple'
        value='value'
        type='text'
        onChange={() => action('Input changed')}
      />
      <InputView
        className={cn('input')}
        description='Input with description'
        dirty={true}
        touched={true}
        name='simple'
        value='value'
        type='text'
        onChange={() => action('Input changed')}
      />
      <InputView
        className={cn('input')}
        label='Invalid input'
        dirty={true}
        error='Incorrect value'
        touched={true}
        name='simple'
        value='value'
        type='text'
        onChange={() => action('Input changed')}
      />
      <InputView
        className={cn('input')}
        label='Disabled input'
        dirty={true}
        disabled={true}
        touched={true}
        name='simple'
        value='value'
        type='text'
        onChange={() => action('Disabled')}
      />
    </StoryBookContainer>
  )
};

InputStory.story = { name: 'Input' };

export default {
  component: InputView,
  title: 'ui'
};
