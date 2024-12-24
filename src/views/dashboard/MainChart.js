import React, { useEffect, useRef } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = ({ appointments }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  // Process appointment data
  const appointmentsByDate = appointments.reduce((acc, apt) => {
    const date = apt.date
    if (!acc[date]) {
      acc[date] = {
        total: 0,
        confirmed: 0,
        inProcess: 0,
        pending: 0
      }
    }
    acc[date].total++
    if (apt.status === 'Confirmada') {
      acc[date].confirmed++
    } else if (apt.status === 'En Proceso') {
      acc[date].inProcess++
    } else if (apt.status === 'Pendiente') {
      acc[date].pending++
    }
    return acc
  }, {})

  const dates = Object.keys(appointmentsByDate).sort()

  return (
    <CChartLine
      ref={chartRef}
      style={{ height: '300px', marginTop: '40px' }}
      data={{
        labels: dates,
        datasets: [
          {
            label: 'Total de Citas',
            backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
            borderColor: getStyle('--cui-info'),
            pointHoverBackgroundColor: getStyle('--cui-info'),
            borderWidth: 2,
            data: dates.map(date => appointmentsByDate[date].total),
            fill: true,
          },
          {
            label: 'Citas Confirmadas',
            backgroundColor: 'transparent',
            borderColor: getStyle('--cui-success'),
            pointHoverBackgroundColor: getStyle('--cui-success'),
            borderWidth: 2,
            data: dates.map(date => appointmentsByDate[date].confirmed),
          },
          {
            label: 'Citas En Proceso',
            backgroundColor: 'transparent',
            borderColor: getStyle('--cui-warning'),
            pointHoverBackgroundColor: getStyle('--cui-warning'),
            borderWidth: 2,
            data: dates.map(date => appointmentsByDate[date].inProcess),
          },
          {
            label: 'Citas Pendientes',
            backgroundColor: 'transparent',
            borderColor: getStyle('--cui-danger'),
            pointHoverBackgroundColor: getStyle('--cui-danger'),
            borderWidth: 1,
            borderDash: [8, 5],
            data: dates.map(date => appointmentsByDate[date].pending),
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              color: getStyle('--cui-body-color'),
            },
          },
          y: {
            beginAtZero: true,
            max: Math.max(...dates.map(date => appointmentsByDate[date].total)) + 1,
            ticks: {
              color: getStyle('--cui-body-color'),
              maxTicksLimit: 5,
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          },
        },
      }}
    />
  )
}

export default MainChart