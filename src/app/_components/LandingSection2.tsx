import React from "react";

const LandingSection2 = () => {
  return (
    <section className="flex flex-col gap-3 pt-16" id="bio">
      <div className="flex gap-2">
        <span className="bg-amber-500 h-7 w-1"></span>
        <h2 className="text-2xl font-bold ">از کجا <span className="text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">شروع</span> شد؟</h2>
      </div>
      <p className="opacity-70 text-justify">
        منی که الان وجود داره از چندین سال پیش شروع شد، من از همون زمونا عاشق
        کار با کامپیوتر بودم، اما هیچ راهنمای مسیری برای من وجود نداشت، تا رسیدم
        وقت انتخاب رشته، تصمیم قطعیمو توی ده ثانیه گرفتم بدون اینکه بدونم اصلا
        اینده کامپیوتر چیه اونو اتخاب کردم درحالی که چندین ماه داشتم برای رشته
        تجربی تلاش میکردم و قطعی هم بود، اما نرم افزارو انتخاب کردم و در طول سه
        سال برنامه نویسی و آشنایی با دوستان و استادانی که واقعا عالی بودن بهترین
        کمک رو کردن برای اینکه وارد این مسیر بشم و ادامش بدم.
      </p>
    </section>
  );
};

export default LandingSection2;
