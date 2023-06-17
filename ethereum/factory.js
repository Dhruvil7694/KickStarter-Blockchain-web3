import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xb4Daa04000e5B324aF37489aA9f508aeA45188cD'
);

export default instance;
