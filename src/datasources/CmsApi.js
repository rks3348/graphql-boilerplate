import Base from './Base.js';
class CmsApi extends Base {
    constructor() {
        super(process.env.CMS_URL);
    }
    willSendRequest(request) {
        request.headers.set('Authorization', 'Bearer ' + process.env.CMS_API_TOKEN);
        // request.headers.set('user-agent', this.context.userAgent);
    }
    async getPost(id) {
        return await this.get(
            `${this.path}/${encodeURIComponent(id)}/posts` // path
        );
    }
}
export default CmsApi;