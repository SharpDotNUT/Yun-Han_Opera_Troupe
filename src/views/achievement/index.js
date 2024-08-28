// achievementUtils.js

export function filterAchievements(
  achievementData,
  userUIAF,
  selectedVersion,
  selectedGoal,
  finished,
  searchString
) {
  console.clear();
  let _out = [];
  function _check(_goal) {
    let flag = true;
    if (searchString && _goal.name.indexOf(searchString) == -1) {
      flag = false;
      console.log("-");
    } else if (searchString && _goal.description.indexOf(searchString) == -1) {
      flag = false;
      console.log("--");
    } else if (selectedVersion != "所有" && _goal.version != selectedVersion) {
      flag = false;
      console.log("---");
    } else {
      let _flag = true;
      if (
        (finished == "已完成" && userUIAF[_goal.id].status == 0) ||
        (finished == "未完成" && userUIAF[_goal.id].status != 3)
      ) {
        _flag = false;
      } else if (finished == "所有") {
        _flag = true;
      }
      flag = _flag;
    }
    return flag;
  }
  if (selectedGoal == -1) {
    for (const _goal of achievementData.data) {
      for (const _group of _goal.achievements) {
        if (_check(_group[_group.length - 1])) {
          _out.push(_group);
        }
      }
    }
  } else {
    let _achievementsGoal = achievementData.data?.[selectedGoal]?.achievements;
    if (!_achievementsGoal) {
      return [];
    }
    _achievementsGoal.forEach((_goal) => {
      if (_check(_goal[_goal.length - 1])) {
        _out.push(_goal);
      }
    });
  }
  return _out;
}

export const UIAF_to_userUIAF = (UIAF)=>{
  let userUIAF = {};
  try{
  for (const achievement of UIAF.list) {
    userUIAF[achievement.id] = achievement;
  }}
  catch(e){
    console.log(e);
  }
  console.log(userUIAF);
  return userUIAF;
}

export function searchAchievement(name, platform) {
  let url;
  if (platform == "bilibili") {
    url = `https://search.bilibili.com/all?keyword=${"原神 成就 " + name}`;
  }
  if (platform == "miyoushe") {
    url = `https://www.miyoushe.com/ys/search?keyword=${"成就 " + name}`;
  }
  window.open(url);
}
