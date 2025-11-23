# 课程管理系统实现总结

## 已完成的工作

### 1. 数据库扩展
- ✅ 扩展了 `courses` 表，添加了以下字段：
  - `course_url`: 课程 URL（游戏 URL 等）
  - `course_source`: 课程来源（official/third_party）
  - `author_name`: 作者名
  - `secret_id`: 用于游戏调用升级接口的验证
  - `primary_item_id`: 主要关联的能力项

### 2. 独立的 3D 游戏应用
- ✅ 创建了 `apps/3d-game` 独立应用
- ✅ 使用 React + Three.js (@react-three/fiber) 实现 3D 游戏
- ✅ 支持通过 URL 参数传递 `secretId` 和 `courseId`
- ✅ 实现了游戏结果提交接口

### 3. 后端实现
- ✅ 创建了 `CourseDAO` - 课程数据访问层
- ✅ 创建了 `CourseService` - 课程业务逻辑层
- ✅ 创建了 `CourseController` - 课程控制器
- ✅ 实现了课程管理的 CRUD API
- ✅ 实现了游戏结果提交 API（通过 secretId 验证）

### 4. 前端管理端
- ✅ 创建了课程管理页面（`/admin/courses`）
- ✅ 实现了课程的增删改查功能
- ✅ 支持课程类型、来源、能力项等字段管理
- ✅ 自动生成 secretId

### 5. Nginx 配置
- ✅ 创建了 `nginx.conf` 配置文件
- ✅ 配置了前端、游戏、后端的代理
- ✅ 支持 iframe 嵌入游戏

## 使用流程

### 1. 启动服务

```bash
# 启动后端（端口 3000）
cd apps/server
npm run dev

# 启动前端（端口 3001）
cd apps/growth-client
npm run dev

# 启动游戏（端口 3002）
cd apps/3d-game
npm install
npm run dev

# 启动 Nginx
nginx -c /path/to/nginx.conf
```

### 2. 创建课程

1. 访问管理端：`http://localhost:8080/admin/courses`
2. 点击"新建课程"
3. 填写课程信息：
   - 课程代码、名称、描述
   - 课程类型：能力训练/技能知识
   - 课程来源：官方课程/三方作者
   - 游戏URL：`http://localhost:3002/?secretId={secretId}&courseId={courseId}`
   - 关联能力项：选择该课程主要训练的能力
4. 提交后系统会自动生成 `secretId`

### 3. 在 C 端使用课程

1. C 端查询课程列表
2. 选择课程后，通过 iframe 加载游戏：
   ```html
   <iframe 
     src={`${course.course_url}?secretId=${course.secret_id}&courseId=${course.course_id}`}
     width="100%"
     height="600px"
   />
   ```

### 4. 游戏提交结果

游戏完成后，会调用后端 API 提交结果：
```typescript
POST /api/course/submit-game-result
{
  "secretId": "xxx",
  "courseId": "xxx",
  "resultData": {
    "correct": true,
    "correctRate": 0.95,
    "score": 95,
    "timeSpent": 5000,
    "userAnswer": {}
  }
}
```

后端会：
1. 验证 secretId 和 courseId
2. 计算经验值
3. 添加到用户能力项经验值
4. 判断是否升级

## API 接口

### 管理端 API

- `GET /api/admin/course/courses` - 获取课程列表
- `POST /api/admin/course/courses` - 创建课程
- `GET /api/admin/course/courses/:course_id` - 获取课程详情
- `PUT /api/admin/course/courses/:course_id` - 更新课程
- `DELETE /api/admin/course/courses/:course_id` - 删除课程

### 游戏端 API

- `POST /api/course/submit-game-result` - 提交游戏结果（通过 secretId 验证）

## 注意事项

1. **SecretId 安全**：secretId 用于验证游戏调用的合法性，应该保密
2. **用户认证**：游戏提交结果时需要用户登录，可以通过 iframe 传递 token
3. **CORS 配置**：确保游戏可以调用后端 API
4. **Nginx 配置**：根据实际部署情况调整端口和路径

## 后续优化

1. 实现 C 端课程列表和详情页面
2. 优化游戏与父窗口的通信（postMessage）
3. 添加课程封面图片上传功能
4. 实现课程内容管理（视频、资料等）
5. 添加课程学习进度跟踪





