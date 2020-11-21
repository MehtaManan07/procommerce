import React from 'react';
import { Card } from 'antd';
import CountUp from 'react-countup'

const DisplayCard = ({ color, title1, number, duration }) => {
  return (
    <>
      <div className="ml-4 mt-2 site-card-border-less-wrapper">
        <Card
          title={`${title1}`}
          bordered
          className="text-center"
          style={{ width: 300, backgroundColor: color }}
        >
          <h3 className="text-center" style={{ fontWeight: 'bolder' }}>
            <CountUp start={0} end={number} duration={duration} seperator="," />
          </h3>
        </Card>
      </div>
    </>
  );
};
export default DisplayCard;
