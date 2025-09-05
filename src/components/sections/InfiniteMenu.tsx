import React from 'react';
import InfiniteMenuCore from './InfiniteMenuSection';

const items = [
  {
    image: '/images/translate.png',
    link: 'https://google.com/',
    title: 'Tool 1 ',
    description: 'AI Translation '
  },
  {
    image: '/images/reverse.png',
    link: 'https://google.com/',
    title: 'Tool 2',
    description: 'Inverse Case'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: 'https://google.com/',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/600/600?grayscale',
    link: 'https://google.com/',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
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