### 一、修改 Publications 页面
1.  图片放入 `public/images/publications/`
2.  编辑 `src/app/publications/publications.json`，修改 `"image"` 路径为 `/images/publications/文件名.png`
3.  Git 流程：`git pull` → `git add .` → `git commit -m "更新Publications"` → `git push`

### 二、修改 Pictures 页面
1.  **主页卡片**：改 `src/config/site-content.json` 的 `artImages` 数组
2.  **画廊列表**：改 `src/app/pictures/list.json` ，`public\images\pictures`的图片信息
3.  Git 流程同上，commit 备注对应修改内容

### 三、新增/修改博客
1.  **新增**
    - 建文件夹 `public/blogs/短链别名`，内建 `index.md` 写内容
    - 图片直接放该文件夹
    - 编辑 `public/blogs/index.json`，顶部新增文章配置（slug/title/tags/date/summary/cover）
2.  **修改**：直接改对应博客的 `index.md` 或 `index.json` 配置
3.  Git 流程同上

### 四、添加主页卡片 (Add Home Card)
1.  **创建组件**：
    - 在 `src/app/(home)/` 下新建组件文件 (e.g., `my-new-card.tsx`)
    - 参考 `hi-card.tsx` 结构，使用 `HomeDraggableLayer` 包裹 `Card` 组件
    - 使用 `useConfigStore` 获取配置，`useCenterStore` 获取中心点坐标
2.  **配置样式**：
    - 编辑 `src/config/card-styles.json` 和 `src/config/card-styles-default.json`
    - 添加新卡片的尺寸配置：
      ```json
      "myNewCard": {
        "width": 200, "height": 100, "order": 9,
        "offsetX": null, "offsetY": null, "enabled": true
      }
      ```
3.  **引入组件**：
    - 编辑 `src/app/(home)/page.tsx`
    - 引入新组件并在 JSX 中渲染：
      ```tsx
      {cardStyles.myNewCard?.enabled !== false && <MyNewCard />}
      ```

### 通用规则
- 开工先 `git pull` 同步远程
- 推送失败就 `git pull` 合并，解决冲突后再推送
git(init)
git add .
git commit -m "..."
git push
