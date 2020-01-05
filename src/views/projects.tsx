/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import Divider from '../elements/divider';
import Inner from '../elements/inner';
import Content from '../elements/content';
import SVG from '../components/svg';
import { UpDown, UpDownWide } from '@/styles/animations';
import ProjectCard from '@/components/project-card';

const Projects = ({ offset }: { offset: number }) => (
  <div>
    <Divider
      bg="linear-gradient(to right, SlateBlue 0%, DeepSkyBlue 100%)"
      clipPath="polygon(0 15%, 100% 25%, 100% 85%, 0 75%)"
      speed={-0.2}
      offset={1.1}
      factor={2}
    />
    <Content speed={0.4} offset={offset + 0.2} factor={2.2}>
      <Inner>
        <div
          sx={{
            display: 'grid',
            gridGap: [4, 4, 4, 5],
            gridTemplateColumns: ['1fr', '1fr', 'repeat(2, 1fr)'],
            h2: { gridColumn: '-1/1', color: 'white !important' }
          }}
        >
          <Styled.h2>Projects</Styled.h2>
          <ProjectCard title="Jace's Blog" link="https://blog.jaceyi.com" bg="linear-gradient(to right, #D4145A 0%, #FBB03B 100%)">
            我的博客用来记录日常生活、学习笔记和踩过的那些坑。使用 Jekyll & Github Pages 搭建。
          </ProjectCard>
          <ProjectCard title="Utils" link="https://util.jaceyi.com" bg="linear-gradient(to right, #8030b5 0%, #ED1E79 100%)">
            整理了日常生活、工作中常用的一些小工具。 使用 React & TypeScript 开发。
          </ProjectCard>
          <ProjectCard title="Ball" link="https://jaceyi.com/static/ball" bg="linear-gradient(to right,#6916e4 0%,#00c6ff 100%)">
            一个网页小游戏，操控雪球向下滚动并躲避树木。为了练习 TypeScript 开发。
          </ProjectCard>
          <ProjectCard title="Other" bg="linear-gradient(to right, #1eb11c 0%, #fbff00 100%);">
            这里不知道放什么。
          </ProjectCard>
        </div>
      </Inner>
    </Content>
    <Divider speed={0.1} offset={offset} factor={2}>
      <UpDown>
        <SVG icon="box" width={6} color="icon_brightest" left="85%" top="75%" />
        <SVG icon="upDown" width={8} color="icon_teal" left="70%" top="20%" />
        <SVG
          icon="triangle"
          width={8}
          stroke
          color="icon_orange"
          left="25%"
          top="5%"
        />
        <SVG
          icon="circle"
          hiddenMobile
          width={24}
          color="icon_brightest"
          left="17%"
          top="60%"
        />
      </UpDown>
      <UpDownWide>
        <SVG
          icon="arrowUp"
          hiddenMobile
          width={16}
          color="icon_green"
          left="20%"
          top="90%"
        />
        <SVG
          icon="triangle"
          width={12}
          stroke
          color="icon_brightest"
          left="90%"
          top="30%"
        />
        <SVG
          icon="circle"
          width={16}
          color="icon_yellow"
          left="70%"
          top="90%"
        />
        <SVG
          icon="triangle"
          hiddenMobile
          width={16}
          stroke
          color="icon_teal"
          left="18%"
          top="75%"
        />
        <SVG
          icon="circle"
          width={6}
          color="icon_brightest"
          left="75%"
          top="10%"
        />
        <SVG
          icon="upDown"
          hiddenMobile
          width={8}
          color="icon_green"
          left="45%"
          top="10%"
        />
      </UpDownWide>
      <SVG
        icon="circle"
        hiddenMobile
        width={6}
        color="icon_brightest"
        left="4%"
        top="20%"
      />
      <SVG icon="circle" width={12} color="icon_pink" left="80%" top="60%" />
      <SVG icon="box" width={6} color="icon_orange" left="10%" top="10%" />
      <SVG icon="box" width={12} color="icon_yellow" left="29%" top="26%" />
      <SVG
        icon="hexa"
        width={16}
        stroke
        color="icon_red"
        left="75%"
        top="30%"
      />
      <SVG
        icon="hexa"
        width={8}
        stroke
        color="icon_yellow"
        left="80%"
        top="70%"
      />
    </Divider>
  </div>
);

export default Projects;
