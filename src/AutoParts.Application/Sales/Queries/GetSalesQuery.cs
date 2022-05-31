using AutoParts.Application.Identity;
using AutoParts.Application.Repositories;
using AutoParts.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace AutoParts.Application.Sales.Queries
{
    public class GetSalesQuery : IRequest<IEnumerable<SaleDto>>
    {
        public GetSalesQuery(DateTime dateStart, DateTime dateEnd, string? seller)
        {
            DateStart = dateStart;
            DateEnd = dateEnd;
            Seller = seller;
        }

        public DateTime DateStart { get; }
        public DateTime DateEnd { get; }
        public string? Seller { get; }
    }

    public class GetSalesQueryHandler : IRequestHandler<GetSalesQuery, IEnumerable<SaleDto>>
    {

        public GetSalesQueryHandler(ISaleRepository saleRepo, UserManager<Account> userManager)
        {
            this.saleRepo = saleRepo;
            this.userManager = userManager;
        }

        private readonly ISaleRepository saleRepo;
        private readonly UserManager<Account> userManager;

        public async Task<IEnumerable<SaleDto>> Handle(GetSalesQuery request, CancellationToken cancellationToken)
        {
            List<Sale> sales;

            var account = await userManager.FindByNameAsync(request.Seller);

            sales = await saleRepo.GetAll(x => x.SaleTime.Date >= request.DateStart.Date && x.SaleTime.Date <= request.DateEnd.Date
                                            && x.Seller.Id == account.EmployeeId);

            sales = sales.OrderByDescending(x => x.SaleTime).ToList();
            var dtos = sales.Select(x =>
            {
                var dto = new SaleDto()
                {
                    Id = x.Id,
                    Sum = x.Sum,
                    DateTime = x.SaleTime.ToString("dd-MM-yyyy hh:mm"),
                    Seller = x.Seller.FullName
                };
                return dto;
            }).ToArray();

            return dtos;
        }
    }
}