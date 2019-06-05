var request = require("request");
var cheerio = require("cheerio");

//function for get Image URL
const fetchClassDataURL = mainUrl =>
  new Promise((resolve, reject) => {
    request(mainUrl, function(error, response, html) {
      if (error) return reject(error);
      if (html === undefined) return reject(response);
      var $ = cheerio.load(html);
      let returnData = [];
      let counter = 0;
      let tempData = [];
      $("#tooltip table tbody tr").each(function(i, element) {
        let currItem = $(this) //整理表格內資料
          .text()
          .replace(/\s+/g, "") //去除所有空格
          .split("\n")[0] //去除換行符號
          .split("："); //去除冒號，形成新陣列
        if (currItem[0] === "課程識別碼") {
          //有效的課程
          counter = 5; //需紀錄的資訊有6項
          currItem[2] !== "" ? tempData.push(currItem[2]) : tempData.push("00"); //記錄班次
        }
        if (counter > 0) {
          tempData.push(currItem[1].split("班次")[0]);
          --counter;
          if (counter === 0) {
            const checkRepeat = returnData.some(
              item => item[1] === tempData[1] && item[0] === item[0]
            );
            if (!checkRepeat) returnData.push(tempData);
            tempData = [];
          }
        }
      });
      resolve(returnData);
    });
  });

//function for download image
var fs = require("fs");
var download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    if (err) {
      console.error(err, "in link " + uri);
      return;
    }
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);
    let file_type = res.headers["content-type"].split("image/")[1];
    if (file_type === undefined) {
      console.error("Not a image");
      return;
    }
    request(uri)
      .pipe(fs.createWriteStream(filename + "." + file_type))
      .on("close", callback);
  });
};

/* execute it */

//if the require path is not exist ,create it
let mainData = [];
const collectAllData = new Promise((resolve, reject) => {
  let allData = [];
  let counter = 0;
  for (let week = 1; week <= 5; week++) {
    for (let page = 1; page <= 5; page++) {
      const mainUrl = `http://gra206.aca.ntu.edu.tw/classrm/index.php/acarm/webcr-use1-new?Type=1&page=${page}&SYearDDL=1081&BuildingDDL=9&Week=${week}&Capacity=1&SelectButton=%E5%88%AA%E9%99%A4`;
      fetchClassDataURL(mainUrl)
        .then(data => {
          data.map((Class, index) => {
            allData.push(Class);
          });
          counter++;
          if (counter === 25) resolve(allData);
        })
        .catch(error => {
          return reject(error);
        });
    }
  }
});
const createCsvWriter = require("csv-writer").createArrayCsvWriter;
const csvWriter = createCsvWriter({
  header: ["班次", "課程識別碼", "課程名稱", "教師", "教室", "時間"],
  path: "file.csv"
  //   encoding: "utf8"
});
const storeDataToCsv = async () => {
  try {
    let data = await collectAllData;
    csvWriter
      .writeRecords(data) // returns a promise
      .then(() => {
        console.log(data, { maxArrayLength: null });
        console.log("...Done");
      });
  } catch (err) {
    console.error(err);
  }
};
storeDataToCsv();
