import moment from 'moment';

const OpeTimeDetail = ({ ope }) => {
  const outputOpeObj = [];
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const sortOpeObj = (opeObjs, day) => {
    return opeObjs.find((opeObj) => {
      return opeObj.day === day;
    });
  };
  const sortedOpeObjs = days.map((day) => {
    return sortOpeObj(ope, day);
  });

  sortedOpeObjs.forEach((sortedOpeObj) => {
    if (sortedOpeObj) {
      let foundFlg = false;
      outputOpeObj.forEach((record) => {
        if (
          record.startTime === sortedOpeObj.startTime &&
          record.endTime === sortedOpeObj.endTime
        ) {
          record.days = [...record.days, sortedOpeObj.day];
          foundFlg = true;
        }
      });

      if (!foundFlg) {
        outputOpeObj.push({
          days: [sortedOpeObj.day],
          startTime: sortedOpeObj.startTime,
          endTime: sortedOpeObj.endTime
        });
      }
    }
  });
  const daysEngToThai = {
    mon: 'จันทร์',
    tue: 'อังคาร',
    wed: 'พุธ',
    thu: 'พฤหัส',
    fri: 'ศุกร์',
    sat: 'เสาร์',
    sun: 'อาทิตย์'
  };

  const Detail = ({ opeDay }) => {
    let dayStr = '';
    if (opeDay.days.length > 1) {
      dayStr =
        daysEngToThai[opeDay.days[0]] +
        ' - ' +
        daysEngToThai[opeDay.days[opeDay.days.length - 1]];
    } else {
      dayStr = daysEngToThai[opeDay.days[0]];
    }
    var startTimeStr = new moment(opeDay.startTime, 'HH:mm:ss').format('LT');
    var endTimeStr = new moment(opeDay.endTime, 'HH:mm:ss').format('LT');

    return (
      <>
        {opeDay ? (
          <div className="flex-column text-brown-default mr-4">
            <div className="text-xs font-kanit">{dayStr}</div>
            <div className="text-base font-kanit font-medium">
              {startTimeStr} - {endTimeStr}
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    );
  };

  return (
    <div className="flex ">
      {outputOpeObj.map((tmpObj, index) => {
        return <Detail key={index} opeDay={tmpObj} />;
      })}
    </div>
  );
};

export default OpeTimeDetail;
