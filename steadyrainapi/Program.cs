
using Serilog;
using Serilog.Events;
using Serilog.Templates.Themes;
using SerilogTracing;
using SerilogTracing.Expressions;
using steadyrainapi.Data;
using steadyrainapi.Interfaces;

namespace steadyrainapi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("localpolicy", builder => builder.WithOrigins("http://127.0.0.1:5500", "https://localhost:7191", "http://localhost:5067").AllowAnyHeader().AllowAnyMethod());
            });

            builder.Services.AddTransient<IStudentsRepository, StudentsRepository>();
            builder.Services.AddTransient<ISchoolRepository, SchoolRepository>();

            var host = builder.Host;
            var configBuilder = new ConfigurationBuilder();

            host
                .ConfigureHostConfiguration((configBuilder) =>
                {
                    configBuilder.AddInMemoryCollection(GetDefaultAppSettings());
                })
                .UseDefaultServiceProvider(((configure) => { configure.ValidateOnBuild = true; }));

            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Override("Microsoft.AspNetCore.Hosting", LogEventLevel.Warning)
                .Enrich.WithProperty("Application", "Example")
                .WriteTo.Console(Formatters.CreateConsoleTextFormatter(theme: TemplateTheme.Code))
                .CreateLogger();

            using var listener = new ActivityListenerConfiguration()
                .Instrument.AspNetCoreRequests()
                .TraceToSharedLogger();

            Log.Information("Starting up");

            var app = builder.Build();


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.MapControllers();
            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseRouting();
            app.UseCors("localpolicy");
            app.UseAuthorization();

            app.UseEndpoints(builder => builder.MapControllers());

            app.Run();
        }
    

        private static IEnumerable<KeyValuePair<string, string?>>? GetDefaultAppSettings()
        {
            return new List<KeyValuePair<string, string?>>
            {
               new("Database:ConnectionString", "Server=127.0.0.1;Port=5432;Database=SteadyRain;UID=postgres;PWD=dev;")
            };
        }
    }
}
