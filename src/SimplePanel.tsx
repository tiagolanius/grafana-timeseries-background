import React from 'react';
import { PanelProps } from '@grafana/data';
import { TimeSeries, TooltipPlugin, ZoomPlugin, TooltipDisplayMode, usePanelContext } from '@grafana/ui';
import { SimpleOptions } from './module';

export const SimplePanel: React.FC<PanelProps<SimpleOptions>> = ({
  options,
  data,
  width,
  height,
  timeRange,
  timeZone,
  onChangeTimeRange,
}) => {
  const { sync } = usePanelContext();
  const frames = data.series || [];

  const opacity = Math.max(0, Math.min(1, Number(options.imageOpacity ?? 0.22)));

  if (!frames.length) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Nenhum dado retornado pela consulta.
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      {options.imageUrl && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            backgroundImage: `url("${options.imageUrl.replace(/"/g, '\\"')}")`,
            backgroundPosition: options.imagePosition || 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: options.imageFit === 'fill' ? '100% 100%' : options.imageFit || 'contain',
            opacity,
          }}
        />
      )}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          minWidth: 0,
          minHeight: 0,
        }}
      >
        <TimeSeries
          frames={frames}
          structureRev={data.structureRev}
          timeRange={timeRange}
          timeZone={timeZone}
          width={Math.max(1, width)}
          height={Math.max(1, height)}
          legend={options.legend}
        >
          {(plotConfig, alignedDataFrame) => (
            <>
              <ZoomPlugin config={plotConfig} onZoom={onChangeTimeRange} />

              {options.tooltip?.mode !== TooltipDisplayMode.None && (
                <TooltipPlugin
                  data={alignedDataFrame}
                  config={plotConfig}
                  mode={options.tooltip?.mode}
                  sync={sync}
                  timeZone={timeZone}
                />
              )}
            </>
          )}
        </TimeSeries>
      </div>
    </div>
  );
};
