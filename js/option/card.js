window.addEventListener('resize', handleResize);

const handleResize = () => {
	const windowWidth = window.innerWidth;

  if (windowWidth < 768) {
    console.log('改行が発生しました');
  }
}
