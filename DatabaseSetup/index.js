const mongoose = require("mongoose");
const faker = require("faker");

const Account = require("./models/Account");
const Career = require("./models/Career");
const City = require("./models/City");
const Profile = require("./models/Profile");
// const CV = require("./models/CV");
// const Recruitment = require("./models/Recruitment");

const careerDatas = require("./career_datas");
const cityDatas = require("./city_datas");

const db = "mongodb://localhost:27017/DACS2";

const password = "123456";

const connectDatabase = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log("MongoDB Connected....");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const SeedCareers = async () => {
  try {
    await Career.deleteMany({});
    console.log("Clean Career Collection");

    for (const career of careerDatas) {
      Career.create(career);
    }

    console.log("Created Career Success");
  } catch (error) {
    console.log(error);
  }
};

const SeedCities = async () => {
  try {
    await City.deleteMany({});
    console.log("Clean City Collection");

    for (const city of cityDatas) {
      City.create(city);
    }

    console.log("Created City Success");
  } catch (error) {
    console.log(error);
  }
};

const SeedProfiles = async (candidates) => {
  await Profile.deleteMany({});
  console.log("Clean Profile Collection");

  try {
    const universities = [
      "Đại học Nam Cần Thơ",
      "Đại học Cần Thơ",
      "Đại học tây đô",
      "Cao đẳng y dược Cần Thơ",
    ];
    const majors = [
      "Công nghệ thông tin",
      "Luật",
      "Xét nghiệm y học",
      "Dược",
      "Ngôn ngữ Anh",
      "Quản trị kinh doanh",
    ];
    const grades = [
      "Trung bình",
      "Trung bình",
      "Trung bình",
      "Trung bình",
      "Khá",
      "Khá",
      "Khá",
      "Giỏi",
      "Giỏi",
      "Xuất sắc",
    ];
    const titles = [
      "CEO",
      "Team lead",
      "Project mangager",
      "Senior developer",
      "Junior developer",
    ];
    const skills = [
      "Làm việc nhóm",
      "Ngoại ngữ",
      "Khả năng học hỏi tốt",
      "Giao tiếp",
      "Quản lý thời gian",
    ];
    const hobbies = ["Nghe nhạc", "Xem phim", "Chơi game", "Lập trình", "Ăn"];

    for (const candidate of candidates) {
      const name = faker.name.findName();
      const birthday = faker.date.between(
        new Date(1990, 1, 1),
        new Date(2002, 12, 31)
      );
      const sdt = "078" + faker.random.number({ min: 123456789, max: 9999999 });
      const email = faker.internet.email();

      const graduateYear = faker.random.number({ min: 2010, max: 2020 });
      const university =
        universities[
          faker.random.number({ min: 0, max: universities.length - 1 })
        ];
      const major =
        majors[faker.random.number({ min: 0, max: majors.length - 1 })];
      const grade =
        grades[faker.random.number({ min: 0, max: grades.length - 1 })];
      const degree = `
      <p>
        <strong>
          ${graduateYear - 4} - ${graduateYear}: ${university}
        </strong><br/>
        <strong>
          Chuyên ngành:
        </strong> 
        ${major}<br/
        <strong>
          Trình độ:
        </strong> 
        ${university.split(" ").slice(0, 2).join(" ")}<br/>
        <strong>
          Loại tốt nghiệp:
        </strong> 
        ${grade}
      </p>
      `;

      const yExp = faker.random.number({ min: 2, max: 7 });
      const title =
        titles[faker.random.number({ min: 0, max: titles.length - 1 })];
      const experience = `
        <p>
          <strong>${
            new Date().getFullYear() - yExp
          } - ${new Date().getFullYear()}: ${title}</strong><br/>
          <strong>Tên công ty: </strong>${faker.company.companyName()}<br/>
          <strong>Mô tả: </strong>${Array(
            faker.random.number({ min: 3, max: 10 })
          )
            .fill("")
            .map((s) => "- " + faker.lorem.lines())
            .join("<br/>")}<br/>
        </p>
      `;
      const mySkills = skills
        .sort((_1, _2) => Math.random() - 0.5)
        .slice(0, faker.random.number({ min: 3, max: skills.length - 1 }))
        .join("<br/>");
      const myHobbies = hobbies
        .sort((_1, _2) => Math.random() - 0.5)
        .slice(0, faker.random.number({ min: 2, max: hobbies.length - 1 }))
        .join("<br/>");
      const target = Array(faker.random.number({ min: 3, max: 10 }))
        .fill("")
        .map((s) => "- " + faker.lorem.lines())
        .join("<br/>");
      const gender = ["Nam", "Nữ"][faker.random.number({ min: 0, max: 1 })];

      Profile.create({
        name,
        birthday,
        sdt,
        email,
        degree,
        experience,
        skill: mySkills,
        hobby: myHobbies,
        target,
        gender,
        account: candidate._id,
      });
    }

    console.log("Created Profile Success");
  } catch (error) {
    console.log(error);
  }
};

const SeedAccounts = async () => {
  try {
    await Account.deleteMany({});

    console.log("Clean Account Collection");
    const candidates = [];

    for (let i = 1; i <= 19; i++) {
      const candidate = await Account.create({
        username: faker.internet.userName().toLowerCase(),
        email: faker.internet.email().toLowerCase(),
        password,
        role: "candidate",
      });
      candidates.push(candidate);
    }

    const ungvien = await Account.create({
      username: "ungvien",
      email: faker.internet.email().toLowerCase(),
      password,
      role: "candidate",
    });
    candidates.push(ungvien);

    SeedProfiles(candidates);

    for (let i = 1; i <= 19; i++) {
      Account.create({
        username: faker.internet.userName().toLowerCase(),
        email: faker.internet.email().toLowerCase(),
        password,
        role: "recruiter",
      });
    }

    const admin = await Account.create({
      username: "admin",
      email: faker.internet.email().toLowerCase(),
      password,
      role: "admin",
    });

    const spadmin = await Account.create({
      username: "spadmin",
      email: faker.internet.email().toLowerCase(),
      password,
      role: "spadmin",
    });

    const tuyendung = await Account.create({
      username: faker.internet.userName().toLowerCase(),
      email: faker.internet.email().toLowerCase(),
      password,
      role: "recruiter",
    });

    console.log("Created Accounts Success");
  } catch (error) {
    console.log(err);
  }
};

const Run = async () => {
  const ConnectResult = await connectDatabase();
  if (!ConnectResult) return;

  await SeedAccounts();
  await SeedCareers();
  await SeedCities();

  console.log("Done! Press [Ctrl] + [C] to exit");
};

Run();
