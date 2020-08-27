import React from 'react';
import {createCn} from "bem-react-classname";
import StoryBookContainer from "#/components/common/storybook/StoryBookContainer";
import StoryBookTitle from "../../common/storybook/StoryBookTitle";
import {ButtonView} from "./Button";
import {action} from "@storybook/addon-actions";
import {Locale} from "#/types/common";
import './Button.stories.scss';

const cn = createCn('ButtonStory');

export const ButtonStory = () => {

  return (
    <StoryBookContainer locale={Locale.ru} className={cn()}>
      <StoryBookTitle>Buttons</StoryBookTitle>
      <ButtonView
        className={cn('button')}
        onClick={() => action('Button clicked')}
      >Button</ButtonView>
      <ButtonView
        className={cn('button')}
        isActive={true}
        onClick={() => action('Button clicked')}
      >Active button</ButtonView>
      <ButtonView
        className={cn('button')}
        isHover={true}
        onClick={() => action('Button clicked')}
      >Hovered button</ButtonView>
      <ButtonView
        className={cn('button')}
        disabled={true}
        onClick={() => action('Button clicked')}
      >Disabled button</ButtonView>
    </StoryBookContainer>
  )
};

ButtonStory.story = { name: 'Button' };

export default {
  component: ButtonView,
  title: 'ui'
};
