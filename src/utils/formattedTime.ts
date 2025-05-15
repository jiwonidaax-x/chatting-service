const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();

const formattedTime = () => {
  return `${
    hours % 12 === 0 ? 12 : hours % 12
  }:${minutes < 10 ? '0' + minutes : minutes} ${hours < 12 ? 'AM' : 'PM'}`;
};

export default formattedTime;
