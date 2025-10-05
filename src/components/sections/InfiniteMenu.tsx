import React from 'react';
import InfiniteMenuCore from './InfiniteMenuSection';

const items = [
  {
    image: '/images/translate.png',
    link: '/tools',
    title: 'AI Translation',
    description: 'Translate text between multiple languages instantly with advanced AI technology'
  },
  {
    image: '/images/reverse.png',
    link: '/tools',
    title: 'Text Case Converter',
    description: 'Transform text between uppercase, lowercase, and title case formats'
  },
  {
    image: '/images/grammar.png',
    link: '/tools',
    title: 'QR Code Generator',
    description: 'Create beautiful customizable QR codes instantly with multiple styles and colors'
  },
  {
    image: '/images/textProcessing.png',
    link: '/tools',
    title: 'Text Processor',
    description: 'Advanced text manipulation and formatting tools for all your needs'
  },
  {
    image: '/images/UpperSmaller.png',
    link: '/tools',
    title: 'Case Transformer',
    description: 'Intelligent text case conversion with multiple formatting options'
  }
];

const InfiniteMenu: React.FC = () => {
  return (
    <div style={{ 
      height: '800px', 
      position: 'relative', 
      width: '100%',
      background: 'url(images/banner_bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <InfiniteMenuCore items={items} />
    </div>
  );
};

export default InfiniteMenu;