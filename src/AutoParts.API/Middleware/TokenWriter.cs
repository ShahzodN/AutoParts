namespace AutoParts.API.Middleware
{
    public class TokenWriter
    {
        private readonly RequestDelegate next;

        public TokenWriter(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            string? token = context.Request.Cookies["ASP.NET_CR"];
            if (token != null)
                context.Request.Headers.Append("Authorization", "Bearer " + token);

            await next(context);
        }
    }
}