import { GenderTraits } from "./genders";

export interface QuestionOption {
  text: string;
  traits: Partial<GenderTraits>;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "你如何看待自己的性别感？",
    options: [
      { text: "非常强烈且稳定", traits: { i: 2, flu: -2 } },
      { text: "有时候感觉强烈，有时候很模糊", traits: { i: 0, flu: 2, c: 1 } },
      { text: "几乎没有性别感", traits: { i: -5, n: 5 } },
      { text: "它一直在变化", traits: { flu: 5, c: 2 } },
    ],
  },
  {
    id: 2,
    text: "当别人用'他'或'她'称呼你时，你的感受是？",
    options: [
      { text: "感觉很自然，符合我的身份", traits: { m: 2, f: 2, n: -2 } },
      { text: "无所谓，我不在乎称谓", traits: { n: 2, c: 1 } },
      { text: "感觉有些不适，或者不完全准确", traits: { c: 3, n: 2 } },
      { text: "非常不适，我更喜欢中性称谓", traits: { n: 5, m: -2, f: -2 } },
    ],
  },
  {
    id: 3,
    text: "在你的理想世界中，你的外在表现是？",
    options: [
      { text: "符合传统的男性或女性形象", traits: { m: 2, f: 2, i: 1 } },
      { text: "介于两者之间，或者模糊不清", traits: { n: 4, c: 2 } },
      { text: "取决于每天的心情", traits: { flu: 4, c: 1 } },
      { text: "完全超越人类的审美范畴", traits: { x: 5, c: 3 } },
    ],
  },
  {
    id: 4,
    text: "你是否觉得你的性别与大自然、星空或某种抽象概念有联系？",
    options: [
      { text: "不，性别是个人或社会的身份", traits: { x: -2, c: -1 } },
      { text: "偶尔会觉得有一种空灵的联系", traits: { x: 3, c: 2 } },
      { text: "是的，我的性别感更像是一种自然力（如云、水、星）", traits: { x: 5, c: 5 } },
      { text: "我的性别感是不可言说的神秘存在", traits: { x: 8, c: 8 } },
    ],
  },
  {
    id: 5,
    text: "你觉得自己的性别有多少种成分？",
    options: [
      { text: "只有一种", traits: { c: -2, i: 2 } },
      { text: "两种", traits: { c: 2, m: 2, f: 2 } },
      { text: "多种，甚至数不清", traits: { c: 5, flu: 2 } },
      { text: "没有成分，它是一片虚无/空白", traits: { n: 5, i: -5 } },
    ],
  },
  {
    id: 6,
    text: "你的性别感会随着环境、人群或压力而改变吗？",
    options: [
      { text: "不会，它是核心且不变的", traits: { flu: -5, i: 2 } },
      { text: "会有一点微妙的变化", traits: { flu: 2, c: 1 } },
      { text: "是的，我像变色龙一样适应环境", traits: { flu: 5, c: 3 } },
      { text: "它与我的情感状态深度绑定", traits: { flu: 4, c: 5 } },
    ],
  },
  {
    id: 7,
    text: "如果你可以完全重塑你的性别实体，你会选择？",
    options: [
      { text: "加强现有的感觉", traits: { i: 3 } },
      { text: "消除所有性别特征", traits: { n: 5, i: -3 } },
      { text: "让自己成为多种性别的融合体", traits: { c: 5, flu: 2 } },
      { text: "超越人类形态", traits: { x: 8, c: 5 } },
    ],
  },
  {
    id: 8,
    text: "你如何描述你对“男性化”或“女性化”的亲和力？",
    options: [
      { text: "我只偏向其中一方", traits: { m: 4, f: 4, n: -2 } },
      { text: "我同时拥有两者的特点", traits: { m: 3, f: 3, c: 2 } },
      { text: "我偏向其中一方，但感觉并不完整", traits: { m: 2, f: 2, n: 3, i: -1 } },
      { text: "这些概念对我来说完全陌生", traits: { x: 5, n: 5 } },
    ],
  },
  {
    id: 9,
    text: "当你独处且不面对社会压力时，你的性别感是？",
    options: [
      { text: "清晰且稳定", traits: { i: 2, flu: -2 } },
      { text: "一种舒适的模糊感", traits: { n: 3, c: 2 } },
      { text: "时隐时现，像一个幻影", traits: { i: -2, c: 3, x: 2 } },
      { text: "完全感受不到它的存在", traits: { i: -5, n: 5 } },
    ],
  },
  {
    id: 10,
    text: "你是否觉得你的性别具有某种“质感”或“温度”？",
    options: [
      { text: "没有，它只是一个身份", traits: { c: -2, x: -2 } },
      { text: "有点像，可能是温凉或柔和的", traits: { c: 2, x: 2 } },
      { text: "是的，它有非常具体的感官特征（如冰、火、雾）", traits: { c: 5, x: 5 } },
      { text: "它更像是一种数字化的、非生物的存在", traits: { x: 8, c: 8 } },
    ],
  }
];
